import React, {useEffect} from "react"
import {Layout} from "../components/Layout"
import {ProgressBar, Container} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {LINK_TYPE, USER_PAGE_TABLE_CSS, EDIT_CLICKED_LINK, CREATE_LINK_TAB, VIEW_LINK_LIST, VIEW_CLICKED_LINK} from "./constants"
import {Alerts} from "../components/Alerts"
import {DocumentHook, GetDocumentListHook, GetDocumentHook, DeleteDocumentHook, EditDocumentHook} from "../hooks/DocumentHook"
import {getUserConfig} from "../components/Views"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DocumentContextObj} from "../hooks/DocumentContextProvider"
import {DisplayDocuments, ViewDocument, CreateDocument, EditDocument} from "../components/Display"


export const LinkForm = () => {

    const {
		connectionError,
        frames,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        woqlClient,
        loading,
        setLoading,
        refresh,
        setRefresh
	} = WOQLClientObj()

    const {
        onRowClick,
        documentId,
        tabKey,
        setTabKey,
        showDocument,
        setShowDocument,
        managePageTabs,
        handleDocumentSubmit,
        extracted,
        handleSelect,
        deleteDocument,
        handleUpdate,
        getDocumentToolBar,
        handleRefresh,
        editDocument,
        extractedUpdate,
        setDocumentId,
        setType,
        type
    } = DocumentContextObj()



    // create
    let result=DocumentHook(woqlClient, extracted, VIEW_LINK_LIST, handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    //view all document
    let linkResults=GetDocumentListHook(woqlClient, type, refresh, setLoading, setSuccessMsg, setErrorMsg)
    //get a document
    let documentResults=GetDocumentHook(woqlClient, documentId, setLoading, setSuccessMsg, setErrorMsg)
    // delete a document
    let deleteResult=DeleteDocumentHook(woqlClient, deleteDocument, VIEW_LINK_LIST,handleRefresh, setLoading, setSuccessMsg, setErrorMsg)
    // edit a document
    let editResult=EditDocumentHook(woqlClient, extractedUpdate, VIEW_CLICKED_LINK, handleRefresh, setDocumentId, setLoading, setSuccessMsg, setErrorMsg)


    useEffect(() => {
        // on changing tabs
        managePageTabs()
    }, [tabKey])


    useEffect(() => {
        setType(LINK_TYPE)
    }, []) // refresh link Results list on reload or change of tabs


    useEffect(() => {
        if(Object.keys(documentResults).length){
            // show view document tab only when a document is clicked
            setShowDocument(documentResults)
        }
    }, [documentResults])


    return <div className="mb-5">
        <Layout/>
        <Alerts errorMsg={connectionError}/>
        {loading && <ProgressBar animated now={100} variant="info"/>}

        <Tabs id="controlled-tab"
            activeKey={tabKey}
            onSelect={(k) => {setTabKey(k)}}
            className="mb-3">
            <Tab eventKey={VIEW_LINK_LIST} title={VIEW_LINK_LIST}>
                <DisplayDocuments results={linkResults}
                    css={USER_PAGE_TABLE_CSS}
                    title={LINK_TYPE}
                    config={getUserConfig(linkResults, onRowClick)}/>
            </Tab>
            {showDocument && !editDocument && <Tab eventKey={VIEW_CLICKED_LINK} title={VIEW_CLICKED_LINK}>

                    <ViewDocument frames={frames}
                        getDocumentToolBar={getDocumentToolBar}
                        handleSelect={handleSelect}
                        type={LINK_TYPE}
                        showDocument={showDocument}/>
                </Tab>
            }
            {editDocument && <Tab eventKey={EDIT_CLICKED_LINK} title={EDIT_CLICKED_LINK}>
                <EditDocument frames={frames}
                    getDocumentToolBar={getDocumentToolBar}
                    handleSelect={handleSelect}
                    type={LINK_TYPE}
                    handleUpdate={handleUpdate}
                    editDocument={editDocument}/>
                </Tab>
            }
            <Tab eventKey={CREATE_LINK_TAB} title={CREATE_LINK_TAB}>
                {frames && <CreateDocument frames={frames}
                    handleSelect={handleSelect}
                    type={LINK_TYPE}
                    handleSubmit={handleDocumentSubmit}/>}
            </Tab>
        </Tabs>

        <Alerts successMsg={successMsg}/>
        <Alerts errorMsg={errorMsg}/>
    </div>

}