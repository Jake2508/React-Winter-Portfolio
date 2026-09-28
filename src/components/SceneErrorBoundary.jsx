import React from 'react';

/*
  A WebGL failure throws during the Canvas's render, and React unmounts the
  whole tree when nothing catches it — taking the HUD and the panel with it,
  so the site goes blank rather than degrading. Catching here keeps the DOM
  side alive and swaps the still in behind it.

  Context loss after a successful start is an event, not a throw, so it never
  reaches this. index.jsx listens for `webglcontextlost` to cover that.
*/
class SceneErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error) {
        console.error('[scene] WebGL failed, showing the still instead:', error);
    }

    render() {
        return this.state.failed ? this.props.fallback : this.props.children;
    }
}


export default SceneErrorBoundary;
