import React from 'react'
import {
  IconDefinition,
  } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import './headerListItem.css'

interface IProps {
    onClick: React.MouseEventHandler<HTMLDivElement>,
    icon: IconDefinition,
    link: string,
    title: string,
    className?: string
}

const HeaderListItem = ({ onClick, icon, link, title,className }: IProps) => {
  return (
    <div className={`headerListItem ${className}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <Link to={link}>{title}</Link>
          </div>
  )
}

export default HeaderListItem