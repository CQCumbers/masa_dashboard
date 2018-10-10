import React from 'react';
import { observer } from 'mobx-react';
import { Mosaic, MosaicZeroState, MosaicWindow, RemoveButton, SplitButton } from 'react-mosaic-component';
import EditableLabel from 'react-inline-editing';
import masa_vector from '../images/masa_vector.svg';
import Panel, { EditButton } from './Panel';


// Workaround for editable panel titles (MosaicWindow.title should be string)
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
  <div>
    <nav className='nav navbar-dark bg-light py-0 px-3 border-bottom border-primary'>
      <a className='my-0 text-white' href='#'>
        <img src={masa_vector} width='50' height='21' className='d-inline-block align-top' />
      </a>
      <span className='ml-auto py-0 navbar-text text-primary'><b>
        {dashboard.telemetry.isLoading ? 'Loading' : dashboard.telemetry.sensors[0].lastTime}
      </b></span>
    </nav>
    {dashboard.telemetry.isLoading ? 'Loading' : (<Mosaic
      renderTile={(id, path) => {
        const panel = dashboard.panels.find(panel => (panel.id == id));
        return (
          <MosaicWindow
            title={<EditableLabel
              text={panel.title} onFocusOut={panel.changeTitle}
              labelClassName='my-auto'
            />}
            panel={panel} path={path} renderPreview={renderPreview}
            createNode={dashboard.createNode}
            toolbarControls={React.Children.toArray([
              <EditButton panel={panel}/>, <SplitButton />, <RemoveButton />
            ])}
          >
            <Panel telemetry={dashboard.telemetry} panel={panel} />
          </MosaicWindow>
        );
      }}
      zeroStateView={<MosaicZeroState createNode={dashboard.createNode} />}
      value={dashboard.mosaicState}
      onChange={dashboard.changeMosaic}
      className='mosaic-theme'
    />)}
  </div>
));


export default Dashboard;
