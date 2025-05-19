import React from 'react';
import { observer } from 'mobx-react-lite';
import toolStore from "../store/ToolStore";

const LayersPanel : React.FC = observer(() => {
    return (
        <div className="layers-panel">
            <h3>Layers</h3>
            <button onClick={() => toolStore.clearLayers()}>Clear All Layers</button>
            <div className="layers-list">
                {toolStore.layers.length === 0 ? (
                    <div style={{ margin: '16px 0', color: '#888' }}>
                        No layers available.
                    </div>
                ) : (
                    toolStore.layers.map(([layerName], idx) => (
                        <div key={idx} className="layer-box" style={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '8px',
                            margin: '8px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <span>
                                <b>Layer {idx + 1}</b>
                                <br />
                                {layerName}
                            </span>
                            <button onClick={() => toolStore.removeLayer(idx)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});

export default LayersPanel;
