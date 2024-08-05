import { Breakpoints } from './types';

/**
 * Breakpoints from Tailwind V3
 *
 * @see https://tailwindcss.com/docs/breakpoints
 */
export const breakpointsTailwind: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Breakpoints from Bootstrap V5
 *
 * @see https://getbootstrap.com/docs/5.3/layout/breakpoints
 */
export const breakpointsBootstrap = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

/**
 * Breakpoints from Angular Material
 *
 * @see https://material.angular.io/cdk/layout/overview
 */
export const breakpointsMaterial: Breakpoints = {
  xsmall: 0,
  small: 600,
  medium: 960,
  large: 1280,
  xlarge: 1920,
};
