import React, { useState, useRef } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Button } from "rebass"
import { palette } from "styled-tools"
import ButterToast, { Cinnamon } from "butter-toast"

import { Heading, Flex } from "./styles"
import { copyToClipboard, getCSS } from "../utils"

const Input = styled.input`
    border: 0;
    border-bottom: 1px solid black;
    padding: 0 0.5em;
    width: 150px;

    &:focus {
        outline:none;
    }
`
const RoundButton = styled.button`
    border-radius: 100%;
    font-size: ${palette("headings", 0)};
    line-height: ${palette("headings", 0)};
    height: 2em;
    width: 2em;
    cursor: pointer;
    
    &:first-child {
        margin-right: 10px;
    }

    &:focus {
        outline:none;
    }
`
const Layout = styled.div`
    width: 450px;
    height: 250px;
    display: grid;
    grid-template-rows: 1fr 0.2fr;
`
const WidgetLayout = styled.div`
    width: 450px;
    display: grid;
    grid-template-rows: 0.3fr 0.7 fr;
`

const Question = styled(Heading)`
    text-align: center;
`


const Widget = React.forwardRef(({ editable, value, update }, ref) => (
    <WidgetLayout ref={ref}>
        <Question h2> 
            Did this{" "}
            {editable ? 
            <Input
                type="text" 
                value={value}
                onChange={event => update(event.target.value)}
                />: value}{" "}
                spark joy?
        </Question>
        <Flex row>
            <RoundButton>UP</RoundButton>
            <RoundButton>D</RoundButton>
        </Flex>
    </WidgetLayout>
))

const WidgetBuilder = () => {
    
    const [typeOfJoy, setTypeOfJoy] = useState("")
    
    
    function exportWidget(){

        const widgetRef = React.createRef()

        const widget = <Widget value={typeOfJoy} ref={widgetRef}/>
        const el = document.createElement("div")
        ReactDOM.render(widget, el)

        const styles = getCSS(widgetRef.current)
        const html = `<style>${styles}</style>${el.innerHTML}`


        copyToClipboard(html)

        ButterToast.raise({
            content: 
            <Cinnamon.Crisp 
            scheme={Cinnamon.Crisp.SCHEME_BLUE} 
            title ="Copied to Clipboard!" 
            content={() => <div>Paste HTML into your favorite editor</div>} />
        })
    }

    return (
    <Layout>
        <Widget 
        editable 
        value={typeOfJoy} 
        update={setTypeOfJoy} 
        />
        <Button bg="primary" onClick={exportWidget}>
            Export
        </Button>
    </Layout>
    )
}

export default WidgetBuilder;