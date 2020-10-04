const excel = require("exceljs")

const generateExcel = (name, data, type) => {

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet(name);

    if (type === 'resource') {
        worksheet.columns = [
            { header: "reference_number", key: "reference_number", width: 20 },
            { header: "manager_name", key: "manager_name", width: 20 },
            { header: "function", key: "function", width: 20 },
            { header: "title", key: "title", width: 20 },
            { header: "start_date", key: "start_date", width: 20 },
            { header: "end_date", key: "end_date", width: 20 },
            { header: "created_at", key: "created_at", width: 20 },
            { header: "propability", key: "propability", width: 20 },
            { header: "percentage", key: "percentage", width: 20 },
            { header: "core_team_member", key: "core_team_member", width: 20 },
            { header: "replacenement", key: "replacenement", width: 20 },
            { header: "replacement_for", key: "replacement_for", width: 20 },
            { header: "requests_count", key: "requests_count", width: 20 },
            { header: "related_opportunity", key: "related_opportunity", width: 20 },
            { header: "assigned_resource", key: "assigned_resource", width: 20 },
            { header: "actual_percentage", key: "actual_percentage", width: 20 },
        ]
    } else {
        worksheet.columns = [
            { header: "reference_number", key: "reference_number", width: 20 },
            { header: "manager_name", key: "manager_name", width: 20 },
            { header: "employee_name", key: "employee_name", width: 20 },
            { header: "employee_id", key: "employee_id", width: 20 },
            { header: "release_date", key: "release_date", width: 20 },
            { header: "propability", key: "propability", width: 20 },
            { header: "release_percentage", key: "release_percentage", width: 20 },
            { header: "release_reason", key: "release_reason", width: 20 },
            { header: "leaving", key: "leaving", width: 20 },
            { header: "request_status", key: "request_status", width: 20 },
        ]
    }

    worksheet.addRows(data)

    return workbook

}

module.exports = generateExcel