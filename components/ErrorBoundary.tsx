"use client";

import { Component, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
          <h1>Something went wrong</h1>
          <p>Open the browser DevTools (F12 or right‑click → Inspect) and check the Console tab for errors.</p>
          <p>Common fixes: run <code>npm install</code>, then <code>npx prisma generate</code> and <code>npx prisma db push</code>.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
