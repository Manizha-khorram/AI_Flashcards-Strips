import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import styles from "../../page.module.css";
import BackgroundBeams from "../../components/BackgroundBeams";


export default function Handler(props) {
  return(
    <div className={styles.relativeContainer}>
      <div className={styles.backgroundBeams}>
        <BackgroundBeams />
      </div>
      <div className={styles.blurredBackground}></div>
      <Card 
        style={{width: "40%", height: "60%", overflow: "hidden"}} 
        className={styles.center}
      >
        <CardBody className={styles.centeredCardBody}>
          <StackHandler fullPage app={stackServerApp} {...props} />
        </CardBody>
      </Card>
    </div>
  )
}
