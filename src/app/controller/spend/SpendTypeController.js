function SpendTypeController() {
    const NewSpendTypeAction = async (addSpendType, name, price, base64Image, imageLength) => {
        if (name == null || name === '') {
            return { status: false, value: 'Name spend type not null !' };
        }
        if (price == null || price === '') {
            return { status: false, value: 'Price spend type not null !' };
        }
        if (imageLength > 1000000) {
            return { status: false, value: 'The image size is too large' };
        }
        if (price == 0) {
            return { status: false, value: 'Spend type price must be greater than 0' };
        }
        const newSpendType = {
            name: name,
            image: base64Image,
            price: price,
            status: 'active'
        }
        await addSpendType(newSpendType);
        return { status: true, value: 'Success !', data: newSpendType };
    }
    return {
        NewSpendTypeAction,
    }
}
export default SpendTypeController