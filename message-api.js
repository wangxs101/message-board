// ===== Google Apps Script 后端代码 =====
// 部署步骤：
// 1. 打开 https://sheets.google.com 创建新表格
// 2. 第一行添加列名：A1=id, B1=author, C1=content, D1=timestamp
// 3. 点击 扩展程序 > Apps Script
// 4. 粘贴此代码，保存
// 5. 点击 部署 > 新建部署 > 选择 "Web 应用"
// 6. 执行身份：我，谁可以访问：任何人
// 7. 点击部署，复制 Web 应用 URL

function doGet(e) {
  var action = e.parameter.action;
  
  if (action === 'list') {
    return listMessages();
  } else if (action === 'add') {
    return addMessage(e.parameter.author, e.parameter.content, e.parameter.timestamp);
  } else if (action === 'delete') {
    return deleteMessage(e.parameter.id);
  }
  
  return jsonResponse({ error: 'Invalid action' });
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var action = data.action;
  
  if (action === 'add') {
    return addMessage(data.author, data.content, data.timestamp);
  } else if (action === 'delete') {
    return deleteMessage(data.id);
  }
  
  return jsonResponse({ error: 'Invalid action' });
}

function listMessages() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var messages = [];
  
  // 跳过标题行（第一行）
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    if (row[0]) {
      messages.push({
        id: row[0],
        author: row[1],
        content: row[2],
        timestamp: row[3]
      });
    }
  }
  
  return jsonResponse({ messages: messages, total: messages.length });
}

function addMessage(author, content, timestamp) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var id = 'msg_' + Date.now();
  
  sheet.appendRow([id, author, content, timestamp || new Date().toISOString()]);
  
  return jsonResponse({ success: true, id: id });
}

function deleteMessage(id) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      sheet.deleteRow(i + 1); // +1 因为行号从 1 开始
      return jsonResponse({ success: true });
    }
  }
  
  return jsonResponse({ success: false, error: 'Message not found' });
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
