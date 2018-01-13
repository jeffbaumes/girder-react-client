import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { csvParseRows, tsvParseRows } from 'd3-dsv';
import { resources } from 'girder-react-client';

export const parserForFile = file => {
  const ext = file.exts[file.exts.length - 1];
  if (file.mimeType === 'text/csv' || ext === 'csv') {
    return csvParseRows;
  }
  if (file.mimeType === 'text/tab-separated-values' || ['tsv', 'tab'].includes(ext)) {
    return tsvParseRows;
  }
};

class TableViewPage extends Component {
  state = {
    content: null,
  }

  componentWillMount = () => {
    const id = this.props.match.params.id;
    Promise.all([
      resources.file.fetchOne({id}),
      resources.file.fileContent({id}),
    ]).then(([file, raw]) => {
      const parser = parserForFile(file);
      if (parser) {
        const content = parser(raw);
        this.setState({content});
      }
    });
  }

  render = () => {
    const { content } = this.state;
    if (!content || !content[0] || content[0][0] === undefined) {
      return null;
    }
    const [headerRow, ...rows] = content;
    const pageRows = rows.slice(0, 20);
    return (
      <div style={{overflowX: 'scroll'}}>
        <Table>
          <Table.Header>
            <Table.Row>
              {
                headerRow.map(cell => <Table.HeaderCell style={{whiteSpace: 'nowrap'}} key={cell} content={cell} />)
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              pageRows.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {
                    row.map((cell, cellIndex) => <Table.Cell style={{whiteSpace: 'nowrap'}} key={headerRow[cellIndex]} content={cell} />)
                  }
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
};

export default TableViewPage;
