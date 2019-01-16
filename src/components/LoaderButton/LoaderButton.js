import React from 'react'
import { Button } from 'reactstrap'

export default ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
  <Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
    {isLoading && <span class="glyphicon glyphicon-refresh" aria-hidden="true" />}
    {!isLoading ? text : loadingText}
  </Button>
)
