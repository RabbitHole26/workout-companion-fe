const removeDropdownFocus = () => {
  const dropdownElement = document.activeElement
  dropdownElement?.blur()
}

export default removeDropdownFocus
