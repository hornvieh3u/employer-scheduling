import React from "react"
import { Card } from "reactstrap"

const Content = (props) => {
    return (
        <Card style={{ height: "100%" }}>
            <div className="p-1 pb-0">
                <h6>
                    <b>{props.hedding}</b>
                </h6>
            </div>

            <div
                className="border box-shadow"
                style={{ borderRadius: "12px", padding: "0.5em", margin: "0.5em" }}
            >
                <iframe
                    style={{ borderRadius: "12px" }}
                    width="100%"
                    height="200"
                    src={props.link}
                    title="YouTube video player"
                    // frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <div className="p-1 d-flex justify-content-center">{props?.content}</div>
        </Card>
    )
}

export default Content