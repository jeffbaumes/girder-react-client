import { addResourceAction, addRoutedContent } from 'girder-react-client';
import TableViewAction from './components/TableViewAction';
import TableViewPage, { parserForFile } from './components/TableViewPage';

export const load = () => {
  addResourceAction({
    type: 'file',
    key: 'table-view',
    component: TableViewAction,
    condition: parserForFile,
  });

  addRoutedContent({
    route: 'file/:id/table-view',
    component: TableViewPage,
  });
};
