export const funcParams = 'data, graph, G6';

const dataFuncBody = `console.log(data.series)
return {
  nodes: [
    {
      id: '0',
      label: 'B'
    },
    {
      id: '1',
      label: 'A-1',
    },
    {
      id: '2',
      label: 'A-2',
    },
    {
      id: '3',
      label: 'A-3',
    },
    {
      id: '4',
      label: 'C-1',
    },
    {
      id: '5',
      label: 'C-2',
    },
    {
      id: '6',
      label: 'D',
    }
  ],
  edges: [
    {
      source: '1',
      target: '0',
    },
    {
      source: '2',
      target: '0',
    },
    {
      source: '3',
      target: '0',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '6',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    }
  ],
}`;

const layoutFuncBody = `return {
  type: 'dagre',
  rankdir: 'RL',
  align: undefined,
  controlPoints: true,
  nodesepFunc: () => 1,
  ranksepFunc: () => 1,
}`;

// const getOption = `function (${funcParams}) {
//   ${funcBody}
// }`
// const funcBodyReg = /{\n([\S\s]*)\n}/;
// const matchResult = getOption.match(funcBodyReg);
// const funcBody = matchResult ? matchResult[1] : '';

export interface SimpleOptions {
  getLayout: string;
  getData: string;
}

export const defaults: SimpleOptions = {
  getLayout: layoutFuncBody,
  getData: dataFuncBody
};
