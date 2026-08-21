import React from 'react';

// ส่วนการแจ้งเตือนแบบ Toast (Bootstrap 5 Toast Notification Component)
export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
      <div className="toast show align-items-center text-theme-dark bg-theme-light border border-2 border-theme shadow rounded-3" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="toast-body small font-bold p-0">
            ✅ {message}
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-close ms-3" 
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
