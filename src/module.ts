// @ts-ignore
import { PanelPlugin as OldPanelPlugin } from '@grafana/ui';
import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';
import { FieldCMEditor } from './components/FieldCMEditor';
import './style.css';

let plugin;

if (!PanelPlugin) {
  // Grafana V6
  plugin = new OldPanelPlugin<SimpleOptions>(SimplePanel).setDefaults(defaults).setEditor(SimpleEditor);
} else {
  // Grafana V7
  plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
    return builder
      .addCustomEditor({
        id: 'getData',
        path: 'getData',
        name: 'AntV G6 Data',
        description: 'Return data called by AntV G6 or just use graph.read(...).',
        defaultValue: defaults.getData,
        editor: FieldCMEditor,
      })
      .addCustomEditor({
        id: 'getLayout',
        path: 'getLayout',
        name: 'AntV G6 Layout',
        description: 'Return layout called by AntV G6 or just use graph.updateLayout(...).',
        defaultValue: defaults.getLayout,
        editor: FieldCMEditor,
      });
  });
}

export { plugin };
