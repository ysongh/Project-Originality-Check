// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProjectOriginalityCheck is ERC721Holder {
  uint public projectCount = 0;
  Project[] public projects;

  struct Project{
    uint id;
    string cid;
    address from;
  }

  uint256 public tableId;
  string private constant _TABLE_PREFIX = "my_hardhat_table";
  uint256 public dataCount = 1;

  constructor() {
    tableId = TablelandDeployments.get().create(
      address(this),
      SQLHelpers.toCreateFromSchema(
        "id integer primary key," // Notice the trailing comma
        "title text,"
        "description text,"
        "date_created integer",
        _TABLE_PREFIX
      )
    );

    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toInsert(
        _TABLE_PREFIX,
        tableId,
        "id,title,description,date_created",
        string.concat(
          Strings.toString(dataCount),
          ",",
          SQLHelpers.quote("Test"),
          ",",
          SQLHelpers.quote("Testing"),
          ",",
          SQLHelpers.quote(Strings.toString(block.timestamp))
        )
      )
    );

    dataCount++;
  }

  function insertProject(string memory title, string memory description) public payable {
    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toInsert(
      _TABLE_PREFIX,
      tableId,
      "id,title,description,date_created",
      string.concat(
          Strings.toString(dataCount),
          ",",
          SQLHelpers.quote(title),
          ",",
          SQLHelpers.quote(description),
          ",",
          SQLHelpers.quote(Strings.toString(block.timestamp))
        )
      )
    );

    dataCount++;
  }

  function addProject(string memory cid) external {
    projects.push(Project(projectCount, cid, msg.sender));
    projectCount++;
  }

  function getPosts() external view returns (Project[] memory) {
    return projects;
  }

  function getTableName() external view returns (string memory) {
    return SQLHelpers.toNameFromId(_TABLE_PREFIX, tableId);
  }
}