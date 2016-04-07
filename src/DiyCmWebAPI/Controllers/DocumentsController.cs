using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using DiyCmDataModel.Construction;
using Microsoft.AspNet.Cors;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Net;
using System.Diagnostics;

namespace DiyCmWebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Documents")]
    [EnableCors("AllowAll")]
    public class DocumentsController : Controller
    {
        private DiyCmContext _context;

        public DocumentsController(DiyCmContext context)
        {
            _context = context;
        }

        // GET: api/Documents
        [HttpGet]
        public IEnumerable<Document> GetDocuments()
        {
            return _context.Documents;
        }

        // GET: api/Documents/5
        [HttpGet("{id}.{type}", Name = "GetDocument")]
        public IActionResult GetDocument([FromRoute] int id, [FromRoute] string type)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Document document = _context.Documents.Where(m => m.DocumentId == id && m.DocumentType == type).Single();

            if (document == null)
            {
                return HttpNotFound();
            }

            return Ok(document);
        }

        // PUT: api/Documents/5
        [HttpPut("{id}")]
        public IActionResult PutDocument(int id, [FromBody] Document document)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != document.DocumentId)
            {
                return HttpBadRequest();
            }

            _context.Entry(document).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(id))
                {
                    return HttpNotFound();
                }
                else
                {
                    throw;
                }
            }

            return new HttpStatusCodeResult(StatusCodes.Status204NoContent);
        }

        // POST: api/Documents
        [HttpPost]
        public IActionResult PostDocument([FromBody] Document document)
        {

            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            _context.Documents.Add(document);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DocumentExists(document.DocumentId))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("GetDocument", new { id = document.DocumentId }, document);
        }
        /*
        public class UploadController : ApiController
        {
            public async Task<HttpResponseMessage> PostFormData()
            {
                // Check if the request contains multipart/form-data.
                if (!Request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                string root = HttpContext.Current.Server.MapPath("~/App_Data");
                var provider = new MultipartFormDataStreamProvider(root);

                try
                {
                    // Read the form data.
                    await Request.Content.ReadAsMultipartAsync(provider);

                    // This illustrates how to get the file names.
                    foreach (MultipartFileData file in provider.FileData)
                    {
                        Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                        Trace.WriteLine("Server file path: " + file.LocalFileName);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                catch (System.Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                }
            }

        }*/
        /*
        public Task<HttpResponseMessage> PostFile()
        {
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/uploads");
            var provider = new MultipartFormDataStreamProvider(root);

            var task = request.Content.ReadAsMultipartAsync(provider).
                ContinueWith<HttpResponseMessage>(o =>
                {

                    string file1 = provider.BodyPartFileNames.First().Value;
            // this is the file name on the server where the file was saved 

            return new HttpResponseMessage()
                    {
                        Content = new StringContent("File uploaded.")
                    };
                }
            );
            return task;
        } */
        // DELETE: api/Documents/5
        [HttpDelete("{id}")]
        public IActionResult DeleteDocument(int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Document document = _context.Documents.Single(m => m.DocumentId == id);
            if (document == null)
            {
                return HttpNotFound();
            }

            _context.Documents.Remove(document);
            _context.SaveChanges();

            return Ok(document);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DocumentExists(int id)
        {
            return _context.Documents.Count(e => e.DocumentId == id) > 0;
        }
    }
}