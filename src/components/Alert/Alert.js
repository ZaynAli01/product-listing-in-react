import React from 'react'

export default function Alert({ alert
}) {
  return (
    <div class={`alert  alert-${alert.className}  p-2 w-100 text-center`} role="alert">
      {alert.msg}
    </div>
  )
}
