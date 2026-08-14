import type { ReactNode } from "react";
import { useLocation } from "wouter";

interface DocsRouteTransitionProps {
  children: ReactNode;
}

export default function DocsRouteTransition({ children }: DocsRouteTransitionProps) {
  const [location] = useLocation();

  return (
    <div className="kb-route-transition" key={location} data-route={location}>
      {children}
    </div>
  );
}
