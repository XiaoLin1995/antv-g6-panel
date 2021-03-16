import React, { PureComponent } from 'react';
import { Field } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { SimpleOptions } from './types';
import MyField from './components/MyField';
import { FieldCMEditor } from 'components/FieldCMEditor';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onChange(key: string, value: any) {
    this.props.onOptionsChange({ ...this.props.options, [key]: value });
  }

  render() {
    const FieldEl = Field || MyField;
    return (
      <>
        <FieldEl
          label="AntV G6 Data"
          description="Return data called by AntV G6 or just use graph.read(...)."
        >
          <FieldCMEditor value={this.props.options.getData} onChange={v => this.onChange('getData', v)} />
        </FieldEl>
        <FieldEl
          label="AntV G6 Layout"
          description="Return layout called by AntV G6 or just use graph.updateLayout(...)."
        >
          <FieldCMEditor value={this.props.options.getLayout} onChange={v => this.onChange('getLayout', v)} />
        </FieldEl>
      </>
    );
  }
}
