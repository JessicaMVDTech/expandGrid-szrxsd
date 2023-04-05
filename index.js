import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
} from '@syncfusion/ej2-react-grids';
import {
  DataManager,
  ODataAdaptor,
  Query,
  WebApiAdaptor,
  ODataV4Adaptor,
} from '@syncfusion/ej2-data';
import { updateSampleSection } from './sample-base';
function RemoteDataBinding() {
  React.useEffect(() => {
    updateSampleSection();
  }, []);
  const data = new DataManager({
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    url: 'https://services.odata.org/v4/northwind/northwind.svc/Orders',
  });
  let gridInstance;
  return (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          dataSource={data}
          height={315}
          allowPaging={true}
          columnQueryMode={'ExcludeHidden'}
        >
          <Inject services={[Page]} />
          <ColumnsDirective>
            <ColumnDirective
              field="OrderID"
              headerText="Order ID"
              width="120"
              textAlign="Right"
              visible={true}
            />
            <ColumnDirective
              field="ShipName"
              headerText="Ship Name"
              width="150"
            />
            <ColumnDirective
              field="Employee.LastName"
              headerText="Employee LastName"
              width="150"
            />
            <ColumnDirective
              field="Employee.Employee1.LastName"
              headerText="ReportsTo LastName"
              width="150"
            />

            <ColumnDirective
              field="Employee.Employee1.FirstName"
              headerText="ReportsTo FirstName"
              width="150"
            />
          </ColumnsDirective>
        </GridComponent>
      </div>
      <div id="waitingpopup" className="waitingpopup">
        <span id="gif" className="image"></span>
      </div>
    </div>
  );
}
export default RemoteDataBinding;

const root = createRoot(document.getElementById('sample'));
root.render(<RemoteDataBinding />);
