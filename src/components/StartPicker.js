// import React from 'react'
// import { VisualPicker, VisualPickerOption } from 'react-rainbow-components'
// import styled from 'styled-components'

// const StyledHeader = styled.h1.attrs((props) => {
//   return props.theme.rainbow.palette
// })`
//   font-size: 24px;
//   font-weight: 300;
//   color: ${(props) => props.text.main};
// `

// const StyledLabel = styled.h2.attrs((props) => {
//   return props.theme.rainbow.palette
// })`
//     font-size: 15px;
//     font-weight: 300;
//     margin-top:6px
//     color: ${(props) => props.text.label};
// `

// class StartPicker extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: 'option-1'
//     }
//     this.handleOnChange = this.handleOnChange.bind(this)
//   }

//   handleOnChange(value) {
//     return this.setState({ value })
//   }

//   render() {
//     const { value } = this.state
//     return (
//       <VisualPicker
//         id="visual-picker-component-1"
//         label="Select Option"
//         value={value}
//         onChange={this.handleOnChange}
//       >
//         <VisualPickerOption name="option-1">
//           <DesignIcon />
//           <StyledLabel>Design</StyledLabel>
//         </VisualPickerOption>
//         <VisualPickerOption name="option-2">
//           <PhotographerIcon />
//           <StyledLabel>Photographer</StyledLabel>
//         </VisualPickerOption>
//         <VisualPickerOption name="option-3">
//           <CodeIcon />
//           <StyledLabel>Programmer</StyledLabel>
//         </VisualPickerOption>
//       </VisualPicker>
//     )
//   }
// }

// ;<div className="rainbow-align-content_center rainbow-m-around_xx-large rainbow-flex_column">
//   <StyledHeader className="rainbow-m-bottom_medium">
//     What are you doing?
//   </StyledHeader>
//   <StartPicker />
// </div>

// const StartPickerComp = React.createElement(StartPicker)

// ReactDOM.render(StartPickerComp)
