# Grafana AntV G6 Panel

![release](https://img.shields.io/github/v/release/XiaoLin1995/antv-g6-panel)
![issues](https://img.shields.io/github/issues-closed/XiaoLin1995/antv-g6-panel)
![stars](https://img.shields.io/github/stars/XiaoLin1995/antv-g6-panel?style=social)

AntV G6 panel for grafana 7.0+, coding with react.

Code editor is attached in the edit panel to configure the option of [AntV G6](https://github.com/antvis/g6).

Support [G6.Graph](https://g6.antv.vision/en/docs/api/Graph).

![screenshot](https://github.com/XiaoLin1995/antv-g6-panel/raw/master/src/img/screenshot.png)

## How Use

1. Download the packaged [plugin](https://github.com/XiaoLin1995/antv-g6-panel/releases).
2. Or clone this repo and run ``yarn build``.
3. Move folder to "/grafana_path/data/plugins".
3. Restart grafana.

## Tips

1. G6 data and layout in the edit panel will execute when the data from grafana is refreshed, so you should avoid side effects or ensure that the side effects of the last execution can be cleared.
```
function (data, graph, G6) {
  return {...}
}
```

## Custom

This plugin build with [@grafana/toolkit](https://www.npmjs.com/package/@grafana/toolkit).
For more information about panels, refer to the documentation on [Panels](https://grafana.com/docs/grafana/latest/features/panels/panels/)

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode or run in watch mode

   ```bash
   yarn dev
   ```

   or

   ```bash
   yarn watch
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

## Learn more

- [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
