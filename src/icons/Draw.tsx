import React from 'react';

export default function Draw(props) {
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
            <path d="M486.305,25.696C469.736,9.126,447.705,0,424.272,0c-23.433,0-45.464,9.126-62.033,25.696L41.916,346.018    c-1.903,1.902-3.313,4.294-4.033,6.983L0.532,492.399c-1.44,5.373,0.097,11.106,4.03,15.039C7.52,510.398,11.497,512,15.572,512    c1.343,0,2.697-0.173,4.029-0.53l139.398-37.35c2.688-0.72,5.081-2.131,6.983-4.034l320.322-320.322    c16.57-16.57,25.695-38.6,25.695-62.033C511.999,64.296,502.875,42.266,486.305,25.696z M351.908,80.068l28.999,28.999    L103.942,386.03l-28.999-28.999L351.908,80.068z M37.593,474.409l23.391-87.297l63.906,63.906L37.593,474.409z M154.969,437.057    l-29.007-29.007l276.964-276.964l29.005,29.005L154.969,437.057z M464.285,127.743l-10.331,10.331l-80.025-80.026l10.331-10.331    c10.687-10.688,24.897-16.575,40.012-16.575c15.115,0,29.325,5.887,40.013,16.575C486.347,69.779,486.347,105.68,464.285,127.743z    "></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
