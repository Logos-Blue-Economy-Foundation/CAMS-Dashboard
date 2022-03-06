
import React, {useEffect} from "react"
import {Table} from "./Table"
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from "../pages/constants"
import {Row} from "react-bootstrap"
import {Form} from "./Form"

export const DisplayDocuments = ({results, css, config, title}) => {
    return <Row className="text-break">
        <Table documents = {results}
            config={config}
            title={title}
            css={css}/>
    </Row>
}

export const ViewDocument = ({frames, type, getDocumentToolBar, FieldTemplate, uiFrame, handleSelect, showDocument}) => {
    return <React.Fragment>
        <Row>
            {getDocumentToolBar && getDocumentToolBar(showDocument)}
        </Row>
        <Row className="text-break">
            <Form frames={frames}
                uiFrame={uiFrame}
                FieldTemplate={FieldTemplate}
                type={type}
                mode={VIEW_MODE}
                hideSubmit={true}
                onSelect={handleSelect}
                formData={showDocument}
            />
        </Row>
    </React.Fragment>
}


export const CreateDocument = ({frames, type, handleSelect, handleSubmit}) => {
    return <Form frames={frames}
        type={type}
        mode={CREATE_MODE}
        onSubmit={handleSubmit}
        onSelect={handleSelect}
        formData={{}}
    />
}

export const EditDocument = ({frames, type, editDocument, getDocumentToolBar, handleUpdate, handleSelect}) => {

    return <React.Fragment>
        <Row>
            {getDocumentToolBar(editDocument)}
        </Row>
        <Row className="text-break">
            <Form frames={frames}
                type={type}
                mode={EDIT_MODE}
                onSubmit={handleUpdate}
                onSelect={handleSelect}
                formData={editDocument}
            />
        </Row>
    </React.Fragment>
}
