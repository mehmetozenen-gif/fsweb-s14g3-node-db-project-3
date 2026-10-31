
const Schemes = require('./scheme-model');

// Şema ID doğrulama
async function checkSchemeId(req, res, next) {
  try {
    const { scheme_id } = req.params;

    const scheme = await Schemes.findById(scheme_id);

    if (!scheme) {
      return res.status(404).json({
        message: `scheme with id ${scheme_id} not found`,
      });
    }

    req.scheme = scheme;
    next();
  } catch (error) {
    next(error);
  }
}

// Yeni şema verisini doğrulama
function validateScheme(req, res, next) {
  const { scheme_name } = req.body || {};

  if (
    typeof scheme_name !== 'string' ||
    !scheme_name.trim()
  ) {
    return res.status(400).json({
      message: 'scheme_name is required',
    });
  }

  req.body.scheme_name = scheme_name.trim();

  next();
}

// Yeni adım verisini doğrulama
function validateStep(req, res, next) {
  const { step_number, instructions } = req.body || {};

  if (
    step_number === undefined ||
    step_number === null
  ) {
    return res.status(400).json({
      message: 'step_number is required',
    });
  }

  if (
    typeof instructions !== 'string' ||
    !instructions.trim()
  ) {
    return res.status(400).json({
      message: 'instructions are required',
    });
  }

  const number = Number(step_number);

  if (
    !Number.isSafeInteger(number) ||
    number < 0
  ) {
    return res.status(400).json({
      message: 'step_number must be a non-negative integer',
    });
  }

  req.body.step_number = number;
  req.body.instructions = instructions.trim();

  next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
