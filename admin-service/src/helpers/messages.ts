export const messages = (data: string) => {
    let language = data;
    
    if (language === 'arabic') {
        const messages = {
            'BadRequest': 'طلب غير صحيح',
            'login': 'تم تسجيل الدخول بنجا',
            'deactive': 'تم تعطيل حسابك من قبل المشرف',
            'signUp': 'تم الاشتراك بنجاح',
            'notExists': 'المستخدم غير موجود',
            'usrAlready': 'المستخدم موجود بالفعل',
            'somethingWrong': 'هل هناك خطأ ما',
            'logout': 'تم تسجيل الخروج بنجاح',
            'loginAgain': 'قد انتهى الوقت المسموح به. الرجاء تسجيل الدخول مرة أخرى',
            'invalidPass': 'كلمة مرور خاطئة',
            'success': 'نجاح',
            'notFound': 'لم يتم العثور على السجل',
            'forgotMail': 'بريدك يمكنك التحقق من كلمة المرور المرسلة على',
            'oldPassword': 'كلمة المرور القديمة غير متطابقة',
            'AlreadyExists': 'موجود بالفعل',
            'notDeletebooking': 'لا يمكنك حذف هذا الحجز',
            'emailAlready': 'البريد الالكتروني موجود بالفعل',
            'alreadyRating': 'لقد قمت بأرسال مراجعة و تقييم بالفعل',
            'AlreadyBook': 'اليوم لا يمكنك حجز خدمة لهذه السيارة لأنك قمت بالفعل بحجز خدمة لهذه السيارة',
            'holidayBooking': 'لديك بالفعل حجوزات بين هذه الأيام. يرجى إلغائها أولاً',
            'BookOnHoliday': 'لا يمكنك حجز خدمة لهذا التاريخ',
            'notCorrectId': 'الرجاء إدخال المعرف الصحيح',
            'serverError': 'Internal Server Error',
            'accountDeactivate': 'Account is deactivated by Admin',
            'notOtpVerify': 'Your Otp is not correct please check again',
            'maximumImg': 'you dont uploading more than 10',
            'size': 'your selected size is not available',
            'menuExist': 'Menu already added'
        };

        return messages;
    } else {
        const messages = {
            'BadRequest': 'Invalid request',
            'login': 'Logged in successfully',
            'deactive': 'Your account is deactivated by admin',
            'signUp': 'SignUp successfully',
            'notExists': 'User does not exist',
            'usrAlready': 'User already exists',
            'somethingWrong': 'Something went wrong',
            'logout': 'Logged out successfully',
            'loginAgain': 'Your session has expired. Please login again',
            'invalidPass': 'Invalid password',
            'success': 'Success',
            'notFound': 'Record not found',
            'forgotMail': 'Password sent to your email. Please check',
            'oldPassword': 'Old password does not match',
            'AlreadyExists': 'Already exists',
            'notDeletebooking': 'You cannot delete this booking',
            'emailAlready': 'Email already exists',
            'alreadyRating': 'You have already sent a review and rating',
            'AlreadyBook': 'Today you cannot book a service for this vehicle because you have already booked a service for this vehicle',
            'holidayBooking': 'You already have bookings between these days. Please cancel them first',
            'BookOnHoliday': 'You cannot book a service for this date because the vendor is closed',
            'notCorrectId': 'Please enter the correct ID',
            'AppUpdate': 'New app version available. Please update.',
            'serverError': 'Internal Server Error',
            'accountDeactivate': 'Account is deactivated by Admin',
            'notOtpVerify': 'Your OTP is not correct, please check again',
            'maximumImg': 'You cannot upload more than 10 images',
            'size': 'The selected size is not available',
            'menuExist': 'Menu already added',
            'invalid_coupon': 'Invalid coupon',
            'invalid_coupon_restaurant': 'This coupon is not valid for this restaurant',
            'already_invalid_coupon': 'Coupon already applied to this restaurant',
            'per_invalid_coupon': 'You cannot apply this coupon because you have exceeded the usage limit',
            'mini_invalid_coupon': 'Your order amount is less than the coupon’s minimum amount'
        };

        return messages;
    }
};
