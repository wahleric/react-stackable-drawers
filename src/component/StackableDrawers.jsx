import React, { useRef, useEffect } from 'react';
import './StackableDrawers.css';

export default class StackableDrawers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawers: [],
            options: this.initOptions(Object.assign({}, props.options))
        };
    }

    componentDidMount() {
        document.addEventListener('stackableDrawerOpen', this.handleDrawerOpenEvent.bind(this));
        document.addEventListener('stackableDrawerClose', this.handleDrawerCloseEvent.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('stackableDrawerOpen', this.handleDrawerOpenEvent.bind(this));
        document.removeEventListener('stackableDrawerClose', this.handleDrawerCloseEvent.bind(this));
    }

    componentDidUpdate() {
        let topDrawerDef = this.state.drawers[this.state.drawers.length - 1];
        if (topDrawerDef?.options?.animate) {
            requestAnimationFrame(() => {
                this.toggleTopDrawerOpenStyle(true);
            });
        }
    }

    initOptions(options) {
        options = options || {};
        return {
            animate: typeof options.animate === 'boolean' ? options.animate : true,
            mount: ['top', 'right', 'bottom', 'left'].includes(options.mount) ? options.mount : 'top',
            callback: options.callback instanceof Function ? options.callback : null,
            showClose: typeof options.showClose === 'boolean' ? options.showClose : true
        };
    }

    handleDrawerOpenEvent(event) {
        let data = event.detail || {};
        this.openDrawer(data.content, data.options || {});
    }

    handleDrawerCloseEvent(event) {
        let data = event.detail || {};
        this.closeDrawer(data.drawerData);
    }

    openDrawer(content, options) {
        let newDrawers = Array.from(this.state.drawers) || [];
        newDrawers.push({
            content: content || <></>,
            options: this.initOptions(Object.assign({}, this.state.options, options))
        });
        this.setDrawers(newDrawers);
    }

    closeDrawer(drawerData) {
        let newDrawers = Array.from(this.state.drawers) || [];
        let topDrawerDef = newDrawers.pop();
        if (topDrawerDef) {
            if (topDrawerDef.options.animate) {
                this.toggleTopDrawerOpenStyle(false);
                setTimeout(() => {
                    this.setDrawers(newDrawers);
                }, 300);
            } else {
                this.setDrawers(newDrawers);
            }
        }
    }

    setDrawers(newDrawers) {
        this.setState(() => ({
            drawers: newDrawers
        }));
    }

    toggleTopDrawerOpenStyle(open) {
        let topDrawerElem = document.querySelector('.drawer:last-child');
        if (topDrawerElem) {
            topDrawerElem.classList.toggle('open', open);
        }
    }

    render() {
        return (
            <div className="stackable-drawers">
                {this.state.drawers.map((drawer, index) => {
                    let drawerButtons = !drawer.options.showClose ? <></> : (
                        <div className="drawer-buttons">
                            <button className="close-button" onClick={this.closeDrawer.bind(this)}>X</button>
                        </div>
                    );

                    return (
                        <div key={index} className={`drawer ${drawer.options.mount} ${!drawer.options.animate ? 'open' : ''}`}>
                            {drawerButtons}
                            {drawer.content}
                        </div>
                    );
                })}
            </div>
        );
    }
};

export const drawerBus = {
    openDrawer(content, options) {
        document.dispatchEvent(new CustomEvent('stackableDrawerOpen', {
            detail: {
                content: content,
                options: options
            }
        }));
    },

    closeDrawer(drawerData) {
        document.dispatchEvent(new CustomEvent('stackableDrawerClose', {
            detail: {
                drawerData: drawerData
            }
        }));
    }
};