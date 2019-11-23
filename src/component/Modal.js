import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const myModal = ({ open, onCancel, onConfirm }) => (
    <Modal open={open} size='mini'>
        <Modal.Content>
            <p>
                Are you sure?
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onCancel}>
                Cancel
            </Button>
            <Button color='teal' onClick={onConfirm} >
                Confirm
            </Button>
        </Modal.Actions>
    </Modal>

)

export default myModal