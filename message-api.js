/**
 * Pixel Message Board - Google Apps Script Backend
 * 
 * 部署步骤:
 * 1. 打开 https://script.google.com/
 * 2. 新建项目，粘贴此代码
 * 3. 点击 Deploy > New deployment
 * 4. 类型选择 "Web app"
 * 5. Execute as: Me
 * 6. Who has access: Anyone (重要！)
 * 7. 点击 Deploy，复制 Web App URL
 * 8. 将 URL 填入 index.html 的 API_URL 变量
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  
  if (data.action === 'add') {
    return addMessage(data);
  }
  
  return jsonResponse({ success: false, error: 'Unknown action' });
}

function doGet(e) {
  var action = e.parameter.action || 'list';
  
  if (action === 'list') {
    return listMessages();
  }
  
  if (action === 'delete' && e.parameter.id) {
    return deleteMessage(e.parameter.id, e.parameter.pin);
  }
  
  return jsonResponse({ success: false, error: 'Unknown action' });
}

function addMessage(data) {
  try {
    var sheet = getSheet();
    var timestamp = data.timestamp || new Date().toISOString();
    
    sheet.appendRow([
      sheet.getLastRow(),
      data.author || 'Anonymous',
      data.content,
      timestamp
    ]);
    
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function listMessages() {
  try {
    var sheet = getSheet();
    var lastRow = sheet.getLastRow();
    
    if (lastRow < 2) {
      return jsonResponse({ success: true, messages: [] });
    }
    
    var data = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
    var messages = [];
    
    // 倒序排列（最新的在前）
    for (var i = data.length - 1; i >= 0; i--) {
      messages.push({
        id: data[i][0],
        author: data[i][1],
        content: data[i][2],
        timestamp: data[i][3]
      });
    }
    
    return jsonResponse({ success: true, messages: messages });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString(), messages: [] });
  }
}

function deleteMessage(id, pin) {
  // 简单的 PIN 验证（修改为你自己的 PIN）
  var ADMIN_PIN = '104675';
  
  if (pin !== ADMIN_PIN) {
    return jsonResponse({ success: false, error: 'Invalid PIN' });
  }
  
  try {
    var sheet = getSheet();
    var lastRow = sheet.getLastRow();
    
    for (var i = 2; i <= lastRow; i++) {
      if (sheet.getRange(i, 1).getValue() == id) {
        sheet.deleteRow(i);
        return jsonResponse({ success: true });
      }
    }
    
    return jsonResponse({ success: false, error: 'Message not found' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function getSheet() {
  // 尝试获取当前绑定的电子表格
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 如果没有绑定的电子表格，创建一个新的
  if (!ss) {
    ss = SpreadsheetApp.create('Pixel Message Board Data');
    Logger.log('Created new spreadsheet: ' + ss.getUrl());
  }
  
  var sheet = ss.getSheetByName('Messages');
  
  if (!sheet) {
    sheet = ss.insertSheet('Messages');
    sheet.appendRow(['ID', 'Author', 'Content', 'Timestamp']);
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
