import React from 'react';
import * as d3 from 'd3';

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();

    React.useEffect(() => {

        renderChartFn(d3.select(ref.current));
        d3.select(ref.current).attr("align","center");

        return () => {};
      });
    return ref;
}