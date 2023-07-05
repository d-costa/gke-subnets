import { Divider, Link, Typography } from "@mui/material";

function Footer() {
    return <div className="footer">
        <Divider/>
        <Typography variant="body2">More information: <Link variant="body2" href="https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips">GCP docs</Link></Typography>
        <Typography variant="body2">Source code: <Link variant="body2" href="https://github.com/d-costa/gke-subnets">GitHub</Link></Typography>
    </div>;

}
export default Footer;
