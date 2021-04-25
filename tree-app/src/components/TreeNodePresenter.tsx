import { TreeNode } from "../utils/tree";
import styled from 'styled-components'

export default function TreeNodePresenter<T>(props: { node: TreeNode<T> }) {
    return (
        <Container>
            <div style={{flex:0.5}}>
                <div style={{ height: 20, minWidth: 20 }}>

                </div>

                {props.node.left ? (
                    <div style={{ borderTop: "1px solid black" }}>
                        <TreeNodePresenter node={props.node.left} />
                    </div>
                ) : null}

            </div>
            <div style={{flex:0.5}}>
                <div style={{ height: 20, textAlign: "left", marginLeft: -2 }}>
                    {props.node.value}
                </div>
                {props.node.right ? (
                    <div style={{ borderTop: "1px solid black" }}>
                        <TreeNodePresenter node={props.node.right} />
                    </div>
                ) : null}

            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`

const Row = styled.div`
   
`