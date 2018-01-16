import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const RemoveResource = ({ resource, submit, parent, history }) => (
  <Modal
    trigger={<Button><Icon name='trash' />Delete</Button>}
    header={`Delete "${resource.name}"?`}
    content={`Are you sure you want to delete this ${resource.type}? It cannot be undone.`}
    actions={[
      { key: 'cancel', content: 'Cancel' },
      { key: 'delete', content: 'Delete', negative: true, onClick: () => {
        submit({id: resource.id}).then(() => {
          let url = `/${parent.type}`;
          if (!parent.isRoot) {
            url += `/${parent.id}`;
          }
          history.push(url);
        });
      }},
    ]}
  />
)

export default RemoveResource
