import React, { useRef, useState, useEffect } from 'react';
import { PanelProps  } from '@grafana/data';
import { SimpleOptions, funcParams } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { debounce } from 'lodash';
import G6, { GraphOptions } from '@antv/g6';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const g6Ref = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<any>(null)
  const [tips, setTips] = useState<Error | undefined>();
  const [tipsTitle, setTipsTitle] = useState<String>();

  const updateGraph = function () {
    if (graph) {
      graph.fitCenter();
      graph.fitView()
      graph.layout();
    }
  }

  const resetGraph = debounce(
    () => {
      if (!graph || !graph.cfg || graph.get('destroyed')) return;
      if (!g6Ref.current) return;
      if (data.state && data.state !== 'Done')  return;
      try {
        setTips(undefined);
        graph.clear();
        let getData = new Function(funcParams, options.getData);
        const o = getData(data, graph, G6);
        o && graph.read(o);
      } catch (err) {
        console.error('Editor data content error!', err);
        setTipsTitle('Editor data content error!')
        setTips(err);
      }
      try {
        setTips(undefined);
        let getLayout = new Function(funcParams, options.getLayout);
        const o = getLayout(data, graph, G6);
        if (o) {
          graph.updateLayout(o)
          updateGraph()
        }
      } catch (err) {
        console.error('Editor layout content error!', err);
        setTipsTitle('Editor layout content error!')
        setTips(err);
      }
    },
    150,
    { leading: true }
  );

  useEffect(() => {
    if (g6Ref.current) {
      graph?.clear()
      graph?.destroy()
      setGraph(() => {
        const graph2 = new G6.Graph({
          container: g6Ref.current,
          width,
          height,
          fitView: true,
          fitCenter: true,
          animation: true,
          modes: {
            default: ['drag-canvas', 'zoom-canvas'],
          },
          defaultNode: {
            size: [50, 20],
            type: 'rect',
            style: {
              lineWidth: 2,
              stroke: '#5B8FF9',
              fill: '#C6E5FF',
            },
          },
          defaultEdge: {
            type: 'polyline',
            size: 1,
            color: '#e2e2e2',
            style: {
              endArrow: {
                path: 'M 0,0 L 8,4 L 8,-4 Z',
                fill: '#e2e2e2',
              },
              radius: 20,
            },
          }
        } as GraphOptions)
        // graph2.data();
        // graph2.render();
        return graph2;
      })
    }

    return () => {
      graph?.clear()
      graph?.destroy()
    }
  }, [g6Ref.current]);

  useEffect(() => {
    graph?.changeSize(width, height);
    updateGraph()
  }, [width, height]);

  useEffect(() => {
    if (graph) {
      resetGraph();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, options.getData, options.getLayout, data]);

  return (
    <>
      {tips && (
        <div className={styles.tips}>
          <h5 className={styles.tipsTitle}>{tipsTitle}</h5>
          {(tips.stack || tips.message).split('\n').map(s => (
            <p>{s}</p>
          ))}
        </div>
      )}
      <div
        ref={g6Ref}
        className={cx(
          styles.wrapper,
          css`
            width: ${width}px;
            height: ${height}px;
          `
        )}
      />
    </>
  );
};

const getStyles = stylesFactory(() => {
  return {
    tips: css`
      padding: 0 10%;
      height: 100%;
      background: rgba(128, 128, 128, 0.1);
      overflow: auto;
    `,
    tipsTitle: css`
      margin: 48px 0 32px;
      text-align: center;
    `,
    wrapper: css`
      
    `,
  };
});
