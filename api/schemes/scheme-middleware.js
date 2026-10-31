
const Schemes = require('./scheme-model');

// Scheme ID kontrolü
async function checkSchemeId(req, res, next) {
  try {
    const { scheme_id } = req.params;

    const scheme = await Schemes.findById(scheme_id);

    if (!scheme) {
      return res.status(404).json({
        message: `scheme_id ${scheme_id} id li şema bulunamadı`,
      });
    }

    req.scheme = scheme;
    next();
  } catch (error) {
    next(error);
  }
}

// Scheme verisi doğrulama
function validateScheme(req, res, next) {
  const { scheme_name } = req.body || {};

  if (
    typeof scheme_name !== 'string' ||
    scheme_name.trim().length === 0
  ) {
    return res.status(400).json({
      message: 'Geçersiz scheme_name',
    });
  }

  req.body.scheme_name = scheme_name.trim();

  next();
}

// Step verisi doğrulama
function validateStep(req, res, next) {
  const { step_number, instructions } = req.body || {};

  if (
    typeof step_number !== 'number' ||
    !Number.isSafeInteger(step_number) ||
    step_number < 0 ||
    typeof instructions !== 'string' ||
    instructions.trim().length === 0
  ) {
    return res.status(400).json({
      message: 'Hatalı step',
    });
  }

  req.body.instructions = instructions.trim();

  next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
