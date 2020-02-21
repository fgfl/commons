// Selector Functions
export function getBillsForCategory(bills, category) {
	let billsForCategory = [];
	const [billObj] = categories.filter((data) => data.id === category);
	if (!billObj) {
		return [];
	} else {
		const bills = billObj.bills.filter((id) => id === bills[id].id);
		bills.forEach((bill) => billsForCategory.push(bills[bill]));
		return billsForCategory;
	}
}
