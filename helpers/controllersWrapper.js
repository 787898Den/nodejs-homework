const controllersWrapper = (ctrl) => {
    const Func = async(req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    }

    return Func;
}

module.exports = controllersWrapper;