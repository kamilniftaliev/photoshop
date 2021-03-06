import React, { SVGAttributes } from 'react';

export default function StatisticsIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      version="1.1"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 512 512"
      {...props}
    >
      <g>
        <g xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M462,112h-48c-27.57,0-50,22.43-50,50v300c0,27.57,22.43,50,50,50h48c27.57,0,50-22.43,50-50V162    C512,134.43,489.57,112,462,112z M472,462c0,5.514-4.486,10-10,10h-48c-5.514,0-10-4.486-10-10V162c0-5.514,4.486-10,10-10h48    c5.514,0,10,4.486,10,10V462z"></path>
          </g>
        </g>
        <g xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M98,264H50c-27.57,0-50,22.43-50,50v148c0,27.57,22.43,50,50,50h48c27.57,0,50-22.43,50-50V314    C148,286.43,125.57,264,98,264z M108,462c0,5.514-4.486,10-10,10H50c-5.514,0-10-4.486-10-10V314c0-5.514,4.486-10,10-10h48    c5.514,0,10,4.486,10,10V462z"></path>
          </g>
        </g>
        <g xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M280,0h-48c-27.57,0-50,22.43-50,50v412c0,27.57,22.43,50,50,50h48c27.57,0,50-22.43,50-50V50C330,22.43,307.57,0,280,0z     M290,462c0,5.514-4.486,10-10,10h-48c-5.514,0-10-4.486-10-10V50c0-5.514,4.486-10,10-10h48c5.514,0,10,4.486,10,10V462z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
