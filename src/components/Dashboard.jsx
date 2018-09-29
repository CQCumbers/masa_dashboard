import React from 'react';
import { observer } from 'mobx-react';
import { Mosaic, MosaicWindow, RemoveButton, SplitButton } from 'react-mosaic-component';
import EditableLabel from 'react-inline-editing';
import Panel, { EditButton } from './Panel';


// Workaround for editable panel titles

const renderPreview = ({ panel }) => (
  <div className="mosaic-preview">
    <div className="mosaic-window-toolbar">
      <div className="mosaic-window-title">{panel.title}</div>
    </div>
    <div className="mosaic-window-body">
      <h4>{panel.title}</h4>
    </div>
  </div>
);

const Dashboard = observer(({ dashboard }) => (
  <Mosaic
    renderTile={(count, path) => (
      <MosaicWindow
        title={
          <EditableLabel
            text={dashboard.panels[count].title}
            onFocusOut={dashboard.panels[count].changeTitle}
            labelClassName='my-auto'
          />
        }
        panel={dashboard.panels[count]}
        path={path}
        createNode={dashboard.createNode}
        toolbarControls={React.Children.toArray([
          <EditButton panel={dashboard.panels[count]}/>,
          <SplitButton />, <RemoveButton />,
        ])}
        renderPreview={renderPreview}
      >
        <Panel panel={dashboard.panels[count]} />
      </MosaicWindow>
    )}
    value={dashboard.mosaicState}
    onChange={dashboard.changeMosaic}
    className='mosaic-theme'
  />
));


export default Dashboard;
