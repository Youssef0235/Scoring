/**
 * Bernaba el Rasol - Data Management & Backup/Restore Handler
 */

window.BernabaBackup = {
  // Export Database Snapshot to JSON file
  exportBackup: async function () {
    try {
      const data = await BernabaDB.exportFullDatabase();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      
      const dateStr = BernabaUtils.getTodayDateString();
      const filename = `Bernaba_el_Rasol_Backup_${dateStr}.json`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      BernabaUtils.showToast('Backup JSON downloaded successfully!', 'success');
    } catch (err) {
      BernabaUtils.showToast('Failed to generate backup: ' + err.message, 'error');
    }
  },

  // Process Uploaded Backup File
  handleRestoreFile: function (file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        
        if (!parsed.children || !parsed.point_rules) {
          throw new Error('Invalid backup file. Missing required data collections.');
        }

        const childCount = parsed.children.length;
        const giftCount = (parsed.gifts || []).length;
        const txCount = (parsed.point_transactions || []).length;

        const confirmMsg = `Backup file validated successfully!\n\nContains:\n• ${childCount} Children\n• ${giftCount} Gifts\n• ${txCount} Point Transactions\n\nWARNING: Restoring will replace existing application data. Do you wish to proceed?`;

        if (confirm(confirmMsg)) {
          await BernabaDB.restoreFullDatabase(parsed);
          BernabaUtils.showToast('Database restored successfully! Reloading...', 'success');
          setTimeout(() => window.location.reload(), 1200);
        }
      } catch (err) {
        BernabaUtils.showToast('Restore Failed: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
  }
};
