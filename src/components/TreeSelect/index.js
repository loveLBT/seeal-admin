import React, { Component } from 'react'
import { Tree } from 'antd'

import './index.less'

const { TreeNode } = Tree

class TreeSelect extends Component {
	renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  onCheck = (checkedKeys) => {
  	if(this.props.onChange) {
  		this.props.onChange(checkedKeys.join(","))
  	}
  }
	render() {
		return (
			<div className="tree_select">
				<Tree
	        checkable
	        defaultExpandAll={true}
	        checkedKeys={this.props.value ? this.props.value.split(",") : []}
	        onCheck={this.onCheck}
	      >
	        {this.renderTreeNodes(this.props.data || [])}
	      </Tree>
			</div>
		)
	}
}

export default TreeSelect