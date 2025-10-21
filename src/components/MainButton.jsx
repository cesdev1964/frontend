import React from 'react'

export default function MainButton({onClick,icon,btnName}) {
  return (
     <div className="add-btn">
          <a
            className="power py-2"
            style={{ maxWidth: "400px" }}
            onClick={onClick}
          >
            <span>
              <i class={`${icon} fs-4`}></i>
            </span>{" "}
            <span className="label">{btnName}</span>
          </a>
        </div>
  )
}
