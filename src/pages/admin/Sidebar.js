import React from "react";
import "../../styles/admin/sidebar.scss";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
          className="products_tree"
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
    </div>
  );
}

export default Sidebar;
