import React from 'react'

export default function ModalComponent({children,modalId,title,icon,modalSize}) {
  return (
     <div
              className="modal fade"
              id={modalId}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className={`modal-dialog modal-dialog-centered ${modalSize}`}>
                <div className="modal-content bg-primary d-flex flex-column">
                  <div className="modal-header bg-danger text-danger border-3 border-bottom border-danger">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      <i className={`${icon} fs-4 me-2`}></i>
                      {title}
                    </h1>
    
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    {children}
                  </div>
                </div>
              </div>
            </div>
  )
}
