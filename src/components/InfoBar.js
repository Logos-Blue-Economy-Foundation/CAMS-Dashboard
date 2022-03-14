
import React, {useState, useEffect} from "react"
import Badge from 'react-bootstrap/Badge'
import {CRITICAL_LINKS, NON_CRITICAL_LINKS, VAR_NAME, ASSET_FORM} from "./constants"
import {NavLink as RouterNavLink} from "react-router-dom"
import {FiMoreHorizontal} from "react-icons/fi"
import {ASSET_FORM_PAGE} from "../routing/constants"
import {Nav} from "react-bootstrap"

export const InfoBar = ({documents, info}) => {
    const [critical, setCritical]=useState(false)
    const [nonCritical, setNonCritical]=useState(false)

    let documentId = info.hasOwnProperty(VAR_NAME) ? info[VAR_NAME] : ""

    useEffect(() => {
        if(Array.isArray(documents) && documents.length){
            let criticalSum = 0, nonCriticalSum = 0
            documents.map(docs => {
                if(docs.critical === 'true') criticalSum += 1 // have stored as string to display in WOQLTable
                if(docs.critical === 'false') nonCriticalSum += 1
            })
            setCritical(criticalSum)
            setNonCritical(nonCriticalSum)
        }
    }, [documents])

    return <div className="text-center">
        <Badge bg="danger" pill className="mt-3 h6 ">
            <div className="d-flex justify-content-center mb-2" title={`${critical} ${CRITICAL_LINKS}`}>
                <label className="m-1 text-white mt-2">{CRITICAL_LINKS}</label> {` `}
                <label className="m-1 text-white mt-2 fw-bold">{critical}</label>
            </div>
        </Badge>
        {' '}
        <Badge bg="success" pill className="mt-3 h6 ">
            <div className="d-flex justify-content-center mb-2" title={`${nonCritical} ${NON_CRITICAL_LINKS}`}>
                <label className=" m-1 text-white mt-2">{NON_CRITICAL_LINKS}</label> {` `}
                <label className="m-1 text-white mt-2 fw-bold">{nonCritical}</label>
            </div>
        </Badge>
        {' '}
        <Badge bg="transparent" pill className="mt-3 h6 go-to-asset-badge">
            <Nav.Link
                as={RouterNavLink}
                title={ASSET_FORM}
                to={ASSET_FORM_PAGE}
                exact
                style={{padding: 0}}
                id={ASSET_FORM}
                onClick={(e) => handleMoreInfo(e)}
            >
                <div className="d-flex justify-content-center">
                    <label className="m-1 text-primary mt-2">More Info</label>
                    <h5 className="text-primary "><FiMoreHorizontal/></h5>
                </div>
            </Nav.Link>
        </Badge>
    </div>


}