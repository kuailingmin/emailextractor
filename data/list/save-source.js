self.on("message", function onMessage(storedEmailLists) {
	var emailLists = $('#email-lists');
	var oldJournalTitle = '';
	emailLists.empty();
	storedEmailLists[0].forEach(function(storedEmailList) {
		var emailHtml = $('#template .email-details').clone();
		var newJournalTitle = storedEmailList.journalTitle;
		if ( newJournalTitle != oldJournalTitle ) {
			console.log('old: ' + oldJournalTitle);
			console.log('new: ' + newJournalTitle);
			emailHtml.find('.url').text(newJournalTitle)
								   .attr('href', storedEmailList.journalURL);
			oldJournalTitle = newJournalTitle;
			emailHtml.find('.url').bind('click', function(event) {
				event.stopPropagation();
				event.preventDefault();
				self.postMessage(storedEmailList.journalURL);
			});
		} else {
			emailHtml.find('.url').remove();
		}



		emailHtml.find('.email-list').html(storedEmailList.emailList);
		emailLists.append(emailHtml);
	});
});

