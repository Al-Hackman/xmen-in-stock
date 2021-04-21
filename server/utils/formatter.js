module.exports = {
    formatPhone: function (phoneNumberString) {
        // get rid of spacings
        let cleanedString = ("" + phoneNumberString).replace(/[\s-]/g, "");
        let match = cleanedString.match(
            /^(\+\d{1,2})?\(?(\d{3})\)?(\d{3})(\d{4})$/im
        );
        console.log(match);
        if (match) {
            let intlCode = match[1] ? `${match[1]} ` : "+1 ";
            return [intlCode, "(", match[2],") ", match[3], "-", match[4]].join("");
        } else {
            return null;
        }
    },
};
